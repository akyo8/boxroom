//  DeviceManager.m
#import "DeviceManager.h"
#import <Photos/Photos.h>
#import <AssetsLibrary/AssetsLibrary.h>

@implementation DeviceManager

// To export a module named DeviceManager
RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getImages,
                  getImagesWithResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  PHFetchResult *allPhotosResult = [PHAsset fetchAssetsWithMediaType:PHAssetMediaTypeImage options:nil];
  NSMutableArray* assetURLDictionaries = [[NSMutableArray alloc] init];
  NSNumber *count = @(allPhotosResult.count);
  
  [allPhotosResult enumerateObjectsUsingBlock:^(PHAsset *asset, NSUInteger idx, BOOL *stop) {
    
    PHImageRequestOptions * imageRequestOptions = [[PHImageRequestOptions alloc] init];
    [[PHImageManager defaultManager]
     requestImageDataForAsset:asset
     options:imageRequestOptions
     resultHandler:^(NSData *imageData, NSString *dataUTI,
                     UIImageOrientation orientation,
                     NSDictionary *info)
     {
       if ([info objectForKey:@"PHImageFileURLKey"]) {
         
         NSURL *path = [info objectForKey:@"PHImageFileURLKey"];
         NSString *_path = path.absoluteString;
         // if you want to save image in document see this.
         [assetURLDictionaries addObject:_path];
         NSNumber *curCount = @([assetURLDictionaries count]);
         if (count == curCount) {
           resolve(assetURLDictionaries);
         }
       }
     }];
  }];
}

RCT_REMAP_METHOD(getAudios,
                 getAudiosWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSMutableArray* assetURLDictionaries = [[NSMutableArray alloc] init];
  
  resolve(assetURLDictionaries);
}

RCT_REMAP_METHOD(getVideos,
                 getVideosWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSMutableArray *array = [[NSMutableArray alloc] init];
  
  ALAssetsLibrary *assetLibrary = [[ALAssetsLibrary alloc] init];
  
  [assetLibrary enumerateGroupsWithTypes:ALAssetsGroupAll usingBlock:^(ALAssetsGroup *group, BOOL *stop1) {
    [group setAssetsFilter:[ALAssetsFilter allVideos]];
    [group enumerateAssetsUsingBlock:^(ALAsset *asset, NSUInteger index, BOOL *stop2) {
      if (asset)
      {
        NSString *type = [asset  valueForProperty:ALAssetPropertyType];
        if ([type isEqualToString:ALAssetTypeVideo])
        {
//          NSURL *url = asset.defaultRepresentation.url;
          ALAssetRepresentation *defaultRepresentation = [asset defaultRepresentation];
          NSString *uti = [defaultRepresentation UTI];
          NSURL *url = [[asset valueForProperty:ALAssetPropertyURLs] valueForKey:uti];
          NSString *_url = url.absoluteString;
          [array addObject:_url];
        }
        
      }
    }];
    if(group==nil)
    {
      NSLog(@"STOP HERE!");
      resolve(array);
    }
  } failureBlock:^(NSError *error) {
  }];
}

@end
