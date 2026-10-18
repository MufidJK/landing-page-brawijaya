export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function getCloudinaryUrl(publicId: string, transformations?: string): string {
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  return transformations 
    ? `${baseUrl}/${transformations}/${publicId}`
    : `${baseUrl}/${publicId}`;
}
