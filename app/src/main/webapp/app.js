window.onload = function () {
    let ws = new WebSocket("ws://localhost:8080/image");

    ws.onopen = function (evt) {
        console.log("WS OPEN");

        // Initial
        ws.send("GET");
    }

    ws.onclose = function (evt) {
        console.log("WS CLOSED");
        ws = null;
    }

    ws.onmessage = function (evt) {
        let reader;
        if (evt.data instanceof Blob) {
            reader = new FileReader();

            reader.onload = () => {
                console.log("Result: ", reader.result.length);
                const canvas = document.getElementById("canvas");
                if (canvas.getContext) {
                    const ctx = canvas.getContext('2d');

                    for (let y = 0; y < 1080; y++) {
                        for (let x = 0; x < 1920; x++) {
                            const i = (y * 1920 + x) * 4;
                            ctx.fillStyle = 'rgb(' +
                                reader.result[i + 2].charCodeAt(0) + ',' +
                                reader.result[i + 1].charCodeAt(0) + ',' +
                                reader.result[i].charCodeAt(0) + ')';

                            ctx.fillRect(x, y, 1, 1);
                        }
                    }

                    // Once canvas update is finished request new frame
                    ws.send("GET");
                }
            }

            reader.readAsBinaryString(evt.data);
        } else {
            console.log("Result: ", evt.data);
        }
    }

    ws.onerror = function (evt) {
        console.log("ERROR: ", evt.data);
    }
}
