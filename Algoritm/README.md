
# Algoritmo de recomendación

Este algoritmo sirve para recomendar libros, el algoritmo tiene sus propios endpoints por lo que se requiere iniciar el sevidor para poder utilizarlo.

- Por defecto, el servidor del algoritmo inicia en el puerto _8000_


El algoritmo se realizó utilizando la librería FastAPI
*(Para más información consulte: https://fastapi.tiangolo.com/#installation)*



## Iniciar servidor


Paquetes a instalar:
```py
pip install [packages]
```

- fastapi
- uvicorn
- numpy
*Espero no se me esté pasando nada*

--

Dirijase a la carpeta src

    cd src

y ejecute el siguiente comando:
    
    python -m API.main

Y listo! si todo salió bien deberá obtener algo parecido a esto por consola:



![App Screenshot](https://i.ibb.co/Z8kTDzR/Screenshot-2024-07-22-at-13-03-00.png)


##
una vez iniciado el servidor puede consultar la documentación de los endpoints directamente desde la url: http://localhost:8000/docs