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
  // TODO remove apiClientId as we now get that out of the TenantClientProvider
  apiClientId: string;
  uploadParams?: UploadParams;
  tenantClientProvider: TenantClientProvider;
}

export * from './dropzone';
