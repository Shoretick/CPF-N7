var APP_DATA = {
  "scenes": [
    {
      "id": "0-carpinteria---foto-1",
      "name": "Carpinteria - Foto 1",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.00870000549149097,
          "pitch": 0.17296832269417983,
          "rotation": 0,
          "target": "1-carpinteria---foto-2"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 1.9860889227751963,
          "pitch": 0.078332436129811,
          "title": "Puerta de acceso",
          "text": "Ingreso y egreso del taller."
        }
      ]
    },
    {
      "id": "1-carpinteria---foto-2",
      "name": "Carpinteria - Foto 2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.21565034194768273,
          "pitch": 0.19690316577095857,
          "rotation": 0,
          "target": "0-carpinteria---foto-1"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
