from instagram_api import InstagramAPI

api = InstagramAPI("tu_nombre_de_usuario", "tu_contraseña")
api.login()

# La imagen debe estar en el mismo directorio que el script
image_path = "imagen.jpg"
caption = "Este es el título de la foto"

# Especificar la fecha y hora en formato UNIX
scheduled_publish_time = 1643212800 # 26 de enero de 2023 a las 12:00 PM GMT-4

# Llamar al método post_photo con el parámetro scheduled_publish_time
api.post_photo(image_path, caption=caption, scheduled_publish_time=scheduled_publish_time)
