var APP_DATA = {
  "scenes": [
    {
      "id": "0-entrada-principal",
      "name": "Entrada Principal",
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
        "yaw": -0.1410435057374002,
        "pitch": 0.0018992900587093686,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": 0.03252833667244559,
          "pitch": -0.06267012950541329,
          "rotation": 0,
          "target": "1-pasillo-1---sector-3"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.031569133342388866,
          "pitch": 0.0618315416542039,
          "title": "Puerta principal",
          "text": "Acceso principal al Centro de Formación Profesional N.º 7. <br><span data-start=\"1155\" data-end=\"1186\">El acceso cuenta con rampa.</span>"
        }
      ]
    },
    {
      "id": "1-pasillo-1---sector-3",
      "name": "Pasillo 1 - Sector 3",
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
        "yaw": -0.09617120368132248,
        "pitch": 0.012515103525235105,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -2.863508871060068,
          "pitch": 0.20312870387308024,
          "rotation": 0,
          "target": "0-entrada-principal"
        },
        {
          "yaw": 0.1682577792367077,
          "pitch": 0.09829988005929025,
          "rotation": 0,
          "target": "2-pasillo-entrada-a-patio-cubierto---sector-3"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-pasillo-entrada-a-patio-cubierto---sector-3",
      "name": "Pasillo entrada a patio cubierto - Sector 3",
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
        "yaw": 0.008892077604164328,
        "pitch": 0.007509062115138576,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": 1.7666946190617452,
          "pitch": 0.21539098894881725,
          "rotation": 0,
          "target": "1-pasillo-1---sector-3"
        },
        {
          "yaw": 0.15970969029289073,
          "pitch": 0.06754844824205719,
          "rotation": 0,
          "target": "3-patio-cubierto---sector-3"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-patio-cubierto---sector-3",
      "name": "Patio cubierto - Sector 3",
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
        "yaw": -1.5409810451261237,
        "pitch": -0.012515103525233329,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -1.6284313996783446,
          "pitch": 0.21909855427508873,
          "rotation": 0,
          "target": "4-pasillo-gastronoma-2---sector-4"
        },
        {
          "yaw": 0.8975588544263147,
          "pitch": 0.10483765992741567,
          "rotation": 0,
          "target": "2-pasillo-entrada-a-patio-cubierto---sector-3"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -1.083802954382966,
          "pitch": 0.09715186377766294,
          "title": "Buffet",
          "text": "Espacio destinado a la venta de comidas y bebidas."
        }
      ]
    },
    {
      "id": "4-pasillo-gastronoma-2---sector-4",
      "name": "Pasillo Gastronomía 2 - Sector 4",
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
        "yaw": 1.7500073760381936,
        "pitch": 0.017521144935331634,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -1.5313829420652318,
          "pitch": 0.06614108501672966,
          "rotation": 0,
          "target": "3-patio-cubierto---sector-3"
        },
        {
          "yaw": 1.5816016774744863,
          "pitch": 0.25680766495854357,
          "rotation": 0,
          "target": "5-pasillo-gastronomia---sector-4"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-pasillo-gastronomia---sector-4",
      "name": "Pasillo Gastronomia - Sector 4",
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
        "yaw": -0.1409990991798935,
        "pitch": 0.02753533786944118,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -1.4606522997164006,
          "pitch": 0.24538468562369076,
          "rotation": 0,
          "target": "4-pasillo-gastronoma-2---sector-4"
        },
        {
          "yaw": -0.008757861545603873,
          "pitch": 0.10377106237566736,
          "rotation": 0,
          "target": "6-gastronomia-a---sector-4"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-gastronomia-a---sector-4",
      "name": "Gastronomia A - Sector 4",
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
        "yaw": 0.7889600598300923,
        "pitch": 0.20274335111289155,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -1.8711750170804393,
          "pitch": 0.11252515323408474,
          "rotation": 0,
          "target": "5-pasillo-gastronomia---sector-4"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -1.8766489165962845,
          "pitch": 0.3502984934375899,
          "title": "Puerta de acceso",
          "text": "Ingreso y egreso del aula."
        }
      ]
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
