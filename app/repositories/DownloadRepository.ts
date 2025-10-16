export class DownloadRepository {
  async downloadAndroid(): Promise<Blob> {
    return await $fetch('/api/v1/download/android', {
      headers: {
        Accept: 'application/octet-stream',
      },
      responseType: 'blob',
    })
  }

  async downloadIso(): Promise<Blob> {
    return await $fetch('/api/v1/download/iso', {
      headers: {
        Accept: 'application/octet-stream',
      },
      responseType: 'blob',
    })
  }
}
