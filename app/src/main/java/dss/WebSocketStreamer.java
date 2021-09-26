package dss;

import javax.websocket.OnMessage;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/image")
public class WebSocketStreamer {
    private final byte[] sampleResponse = { (byte) 0xff, 0x00 };

    // Returns current frame pixels
    @OnMessage
    public byte[] handleTextMessage(String message) {
        if (message.equals("GET")) {
            if (WebSocketListener.imageBuffer.length != 0) {
                return WebSocketListener.imageBuffer;
            }
        }

        return sampleResponse;
    }
}
