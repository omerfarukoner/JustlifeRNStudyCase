import React, { memo, useState } from 'react';
import { View, ActivityIndicator, ViewStyle } from 'react-native';
import FastImage, {
  FastImageProps,
  Source,
  OnLoadEvent,
  ResizeMode,
  Priority,
} from 'react-native-fast-image';
import { colors } from '../../theme';
import styles from './OptimizedImage.styles';

const defaultFallbackImage = require('../../assets/images/fallback.png');

type OptimizedImagePriority = 'low' | 'normal' | 'high';
type OptimizedImageCacheControl = 'immutable' | 'web' | 'cacheOnly';
type OptimizedImageResizeMode = 'contain' | 'cover' | 'stretch' | 'center';

type OptimizedImageProps = Omit<
  FastImageProps,
  'style' | 'priority' | 'cacheControl' | 'resizeMode'
> & {
  fallbackSource?: Source;
  renderLoadingComponent?: () => React.ReactNode;
  renderErrorComponent?: () => React.ReactNode;
  style?: ViewStyle;
  priority?: OptimizedImagePriority;
  cacheControl?: OptimizedImageCacheControl;
  resizeMode?: OptimizedImageResizeMode;
};

const priorityMap: Record<OptimizedImagePriority, Priority> = {
  low: FastImage.priority.low,
  normal: FastImage.priority.normal,
  high: FastImage.priority.high,
} as const;

const cacheControlMap: Record<OptimizedImageCacheControl, string> = {
  immutable: FastImage.cacheControl.immutable,
  web: FastImage.cacheControl.web,
  cacheOnly: FastImage.cacheControl.cacheOnly,
} as const;

const resizeModeMap: Record<OptimizedImageResizeMode, ResizeMode> = {
  contain: FastImage.resizeMode.contain,
  cover: FastImage.resizeMode.cover,
  stretch: FastImage.resizeMode.stretch,
  center: FastImage.resizeMode.center,
} as const;

const DEFAULT_PRIORITY: OptimizedImagePriority = 'high';
const DEFAULT_CACHE_CONTROL: OptimizedImageCacheControl = 'immutable';
const DEFAULT_RESIZE_MODE: OptimizedImageResizeMode = 'cover';

const OptimizedImage: React.FC<OptimizedImageProps> = memo(
  ({
    source,
    fallbackSource = defaultFallbackImage,
    renderLoadingComponent,
    renderErrorComponent,
    style,
    onError,
    onLoad,
    resizeMode = DEFAULT_RESIZE_MODE,
    priority = DEFAULT_PRIORITY,
    cacheControl = DEFAULT_CACHE_CONTROL,
    ...rest
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = (onLoadEvent: OnLoadEvent) => {
      setIsLoading(false);
      onLoad?.(onLoadEvent);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    const fastImageProps = {
      source: hasError ? fallbackSource : source,
      onLoad: handleLoad,
      onError: handleError,
      resizeMode: resizeModeMap[resizeMode],
      style: styles.image,
      priority: priorityMap[priority],
      cacheControl: cacheControlMap[cacheControl],
      ...rest,
    };

    return (
      <View style={[styles.container, style]}>
        <FastImage {...fastImageProps} />
        {isLoading && (
          <View style={styles.overlay}>
            {renderLoadingComponent?.() || (
              <ActivityIndicator size="small" color={colors.primary} />
            )}
          </View>
        )}
        {hasError && !fallbackSource && renderErrorComponent && (
          <View style={styles.overlay}>{renderErrorComponent()}</View>
        )}
      </View>
    );
  },
);

export default OptimizedImage;
