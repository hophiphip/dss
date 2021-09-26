package dss;

import javax.websocket.OnMessage;
import javax.websocket.server.ServerEndpoint;
import java.util.Arrays;

@ServerEndpoint("/ws")
public class WebSocketListener {
    static public byte[] imageBuffer;

    private final byte[] sampleResponse = { (byte) 0xff, 0x00 };

    @OnMessage
    public String handleTextMessage(String message) {
        return message;
    }

    @OnMessage(maxMessageSize = 10 * 1024 * 1024)
    public byte[] handleBinaryMessage(byte[] buffer) {
        imageBuffer = Arrays.copyOf(buffer, buffer.length);
        return sampleResponse;
    }

}