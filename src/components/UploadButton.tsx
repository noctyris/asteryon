import { CldUploadWidget, CldImage, CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from "next-cloudinary";

interface UploadButtonProps {
  publicID?: string;
  setPublicID: (id: string | undefined) => void;
}

export default function UploadButton(props: UploadButtonProps) {
  return (
    <CldUploadWidget
      options={{
        multiple: false,
        sources: ["local"],
        cropping: false,
        clientAllowedFormats: ["webp", "png", "jpg", "jpeg"],
      }}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result: CloudinaryUploadWidgetResults) => {
        const info = result.info as CloudinaryUploadWidgetInfo;
        if (info?.public_id) {
          props.setPublicID(info.public_id);
        }
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleClick() {
          props.setPublicID(undefined);
          open();
        }
        return props.publicID ? (
          <CldImage
            width="1280"
            height="960"
            src={props.publicID}
            sizes="100vw"
            alt="Uploaded image"
            className="h-15 w-fit"
            onClick={handleClick}
          />
        ) : (
          <button type="button" onClick={handleClick}>
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
