async function main() {
  try {
    const ATER_BASE_URL = {{ATER_DIGITAL_URL}};
    const ATER_API_KEY = {{ATER_DIGITAL_API_KEY}};
    const SESSION_TOKEN = "Bearer " + {{SESSION_TOKEN_VALUE}};

    const threadId = {{ATER_DIGITAL_MESSAGE_THREAD}};
    const farmId = {{FARM_USER_CHOICE_ID}};
    const message = {{USER_REPLY}};

    const MEDIA_MESSAGE_ID = {{WHATSAPP_MEDIA_MESSAGE_ID}};

    // let fileKey = null;
    // let attachmentId = null;

    if (MEDIA_MESSAGE_ID) {
      const EVOLUTION_BASE_URL = {{BASE_URL}};
      const EVOLUTION_INSTANCE = {{INSTANCE}};
      const EVOLUTION_API_KEY = {{EVOLUTION_API_KEY}};

      function getBase64SizeBytes(base64) {
        const cleanBase64 = base64.includes(",")
          ? base64.split(",")[1]
          : base64;

        const padding = cleanBase64.endsWith("==")
          ? 2
          : cleanBase64.endsWith("=")
            ? 1
            : 0;

        return Math.floor((cleanBase64.length * 3) / 4) - padding;
      }

      function getExtensionFromMimeType(mimeType) {
        const map = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
          "audio/ogg": "ogg",
          "audio/mpeg": "mp3",
          "audio/mp4": "mp4",
          "video/mp4": "mp4",
          "application/pdf": "pdf",
        };

        return map[mimeType] || "bin";
      }

      function normalizeUploadUrl(url) {
        return url.replace(
          "http://localhost:10000/",
          "https://pgd51wh1-10000.brs.devtunnels.ms/",
        );
      }

      const mediaRequestHeaders = {
        "Content-Type": "application/json",
        apikey: EVOLUTION_API_KEY,
      };

      const mediaRequestBody = {
        message: {
          key: {
            id: MEDIA_MESSAGE_ID,
          },
        },
      };

      const mediaResponse = await fetch(
        EVOLUTION_BASE_URL +
          "/chat/getBase64FromMediaMessage/" +
          EVOLUTION_INSTANCE,
        {
          method: "POST",
          headers: mediaRequestHeaders,
          body: JSON.stringify(mediaRequestBody),
        },
      );

      const mediaResponseData = JSON.parse(mediaResponse);

      const mediaBase64 = mediaResponseData.base64;
      const mediaMimetype =
        mediaResponseData.mimetype || "application/octet-stream";

      const mediaSizeBytes = getBase64SizeBytes(mediaBase64);
      const mediaFileExtension = getExtensionFromMimeType(mediaMimetype);
      const mediaFilename =
        "whatsapp-" + MEDIA_MESSAGE_ID + "." + mediaFileExtension;

      const requestUploadHeaders = {
        "Content-Type": "application/json",
        "x-api-key": ATER_API_KEY,
        Authorization: SESSION_TOKEN,
      };

      const requestUploadBody = {
        filename: mediaFilename,
        mimeType: mediaMimetype,
        sizeBytes: mediaSizeBytes,
      };

      const requestUploadResponse = await fetch(
        ATER_BASE_URL + "/chat/attachments/request-upload-url",
        {
          method: "POST",
          headers: requestUploadHeaders,
          body: JSON.stringify(requestUploadBody),
        },
      );

      const requestUploadResponseData = JSON.parse(requestUploadResponse);

      // fileKey = requestUploadResponseData.fileKey;
      // attachmentId = requestUploadResponseData.attachmentId;

      const uploadUrl = normalizeUploadUrl(requestUploadResponseData.uploadUrl);

      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": mediaMimetype,
        },
        body: mediaBase64,
      });
    }

    const chatRequestBody = {
      farmId,
      message,
    };

    if (threadId) {
      chatRequestBody.threadId = threadId;
    }

    const chatRequestHeaders = {
      "Content-Type": "application/json",
      "x-api-key": ATER_API_KEY,
      Authorization: SESSION_TOKEN,
    };

    const chatResponse = await fetch(
      "https://pgd51wh1-3333.brs.devtunnels.ms/chat/typebot/messages",
      {
        method: "POST",
        headers: chatRequestHeaders,
        body: JSON.stringify(chatRequestBody),
      },
    );

    const chatResponseData = JSON.parse(chatResponse);

    setVariable("ATER_DIGITAL_MESSAGE_STATUS_CODE", 200);
    setVariable("ATER_DIGITAL_MESSAGE_VALUE", chatResponseData.text);
    setVariable("ATER_DIGITAL_MESSAGE_THREAD", chatResponseData.threadId);
  } catch (error) {
    setVariable("ATER_DIGITAL_MESSAGE_STATUS_CODE", 400);
    setVariable("ATER_DIGITAL_MESSAGE_VALUE", error.message);
  }
}
