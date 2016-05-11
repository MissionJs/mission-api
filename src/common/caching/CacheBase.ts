import {ICachingPolicy} from '../../config';

export interface ICachingProvider {
    AddItem<TValue>(key: string, value: TValue, regionName?: string, cachePolicy?: ICachingPolicy): Promise<boolean>;
    GetItem<TValue>(key: string, regionName?: string, cachePolicy?: ICachingPolicy): Promise<TValue>;
    RemoveItem(key: string, regionName?: string): Promise<boolean>;
    RemoveRegion(regionName: string): Promise<boolean>;
    GetAllKeys(regionName?: string): Promise<Array<string>>;
    ApplyPolicy(key: string, cachePolicy: ICachingPolicy): Promise<void>;
}

