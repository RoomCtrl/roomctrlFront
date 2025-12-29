export class DownloadRepository {
  async downloadAndroid(): Promise<Blob> {
    return await $fetch('/api/download/android', {
      headers: {
        Accept: 'application/octet-stream',
      },
      responseType: 'blob',
    })
  }

  async downloadIso(): Promise<Blob> {
    return await $fetch('/api/download/iso', {
      headers: {
        Accept: 'application/octet-stream',
      },
      responseType: 'blob',
    })
  }
}
