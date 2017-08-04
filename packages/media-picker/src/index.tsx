export interface Client {
  id: string;
  token: string;
}

export interface TokenContext {
  collectionName?: string;
}

export interface TenantClientProvider {
  (context: TokenContext): Promise<Client>;
}

export interface UploadParams {
  collectionName?: string;
  fetchMetadata?: boolean;
  autoFinalize?: boolean;
}

export interface PickerProps {
  apiUrl: string;
  uploadParams?: UploadParams;
  tenantClientProvider: TenantClientProvider;
}

export * from './dropzone';
export * from './popup';
