[
    {
        "id": "5fc6a6dc.1d5f9",
        "type": "tab",
        "label": "insert into DB"
    },
    {
        "id": "4abd480c.dc601",
        "type": "http in",
        "z": "5fc6a6dc.1d5f9",
        "name": "",
        "url": "/storeMonitorData",
        "method": "get",
        "swaggerDoc": "",
        "x": 188.5,
        "y": 70,
        "wires": [
            [
                "fdf8c17e.dfc278"
            ]
        ]
    },
    {
        "id": "65ab9908.c875a",
        "type": "debug",
        "z": "5fc6a6dc.1d5f9",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "payload",
        "x": 675.5,
        "y": 100,
        "wires": []
    },
    {
        "id": "f5a890ba.92f",
        "type": "http response",
        "z": "5fc6a6dc.1d5f9",
        "name": "",
        "x": 716.5,
        "y": 289,
        "wires": []
    },
    {
        "id": "fdf8c17e.dfc278",
        "type": "function",
        "z": "5fc6a6dc.1d5f9",
        "name": "accumelateWatt",
        "func": "var CurrentWatt =Number(msg.payload.watt);\n\nvar AccWatt = Number(flow.get(\"AccWatt\")) || 0;\nAccWatt = AccWatt + CurrentWatt ;\n\nflow.set(\"AccWatt\",AccWatt);\n\nmsg.payload.AccWatt = AccWatt;\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 388.5,
        "y": 311,
        "wires": [
            [
                "f5a890ba.92f",
                "65ab9908.c875a",
                "e7d4b2ce.0eb388"
            ]
        ]
    },
    {
        "id": "e7d4b2ce.0eb388",
        "type": "delay",
        "z": "5fc6a6dc.1d5f9",
        "name": "",
        "pauseType": "queue",
        "timeout": "30",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "minute",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": true,
        "x": 355.5,
        "y": 438,
        "wires": [
            [
                "15d5d702.5497b1"
            ]
        ]
    },
    {
        "id": "2dbc3d93.3f6e0a",
        "type": "debug",
        "z": "5fc6a6dc.1d5f9",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 611.5,
        "y": 440,
        "wires": []
    },
    {
        "id": "c631ad90.0c567",
        "type": "mysql",
        "z": "5fc6a6dc.1d5f9",
        "mydb": "7088e012.b4fa9",
        "name": "",
        "x": 395.5,
        "y": 604,
        "wires": [
            [
                "2dbc3d93.3f6e0a"
            ]
        ]
    },
    {
        "id": "15d5d702.5497b1",
        "type": "function",
        "z": "5fc6a6dc.1d5f9",
        "name": "inserrt",
        "func": "msg.topic = \"INSERT INTO consumption(amount) VALUES (\"+msg.payload.AccWatt+\")\";\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 176.5,
        "y": 630,
        "wires": [
            [
                "c631ad90.0c567"
            ]
        ]
    },
    {
        "id": "7088e012.b4fa9",
        "type": "MySQLdatabase",
        "z": "",
        "host": "localhost",
        "port": "3306",
        "db": "test_node_red",
        "tz": ""
    }
]
