import BasicAccordion from '@/components/BasicAccordion/BasicAccordion'
import Stack from '@mui/joy/Stack'

export default async function Faq() {
  const questions = [
    {
      title: '¿Qué es Traquealo?',
      summary:
        'Respuesta: Traquealo es una plataforma digital diseñada para reportar y monitorear problemas en tu comunidad, como la falta de energía eléctrica, estorbos públicos, daños a carreteras y pavimento, basureros clandestinos, entre otros.',
    },
    {
      title: '¿Cómo puedo reportar un problema?',
      summary:
        'Para reportar un problema, debes crear una cuenta, iniciar sesión, seleccionar la opción de Reportar y seguir las instrucciones en pantalla.',
    },
    {
      title: '¿Necesito una cuenta para usar Traquealo?',
      summary:
        'Sí, necesitas crear una cuenta para poder reportar y monitorear problemas.',
    },
    {
      title: '¿Cómo creo una cuenta?',
      summary:
        'Puedes crear una cuenta haciendo clic en la opción de Sign in y completando el formulario ques básicamente un email o una cuenta activa Facebook, Google o Microsoft.',
    },
    {
      title: '¿Qué tipo de problemas puedo reportar?',
      summary:
        'Puedes reportar cualquier problema que afecte a tu comunidad, como falta de energía eléctrica, estorbos públicos, daños a carreteras y pavimento, basureros clandestinos, entre otros.',
    },
    {
      title: '¿Puedo agregar fotos o videos a mi reporte?',
      summary:
        'Sí, te animamos a agregar fotos o videos para proporcionar más contexto y ayudar a resolver el problema más rápidamente.',
    },
    {
      title: '¿Cómo puedo monitorear el estado de mi reporte?',
      summary:
        'Puedes monitorear el estado de tu reporte iniciando sesión en tu cuenta y accediendo a la sección de “Mis Reportes”',
    },
    {
      title: '¿Puedo editar o cancelar un reporte después de haberlo enviado?',
      summary:
        'Sí, puedes editar o cancelar tu reporte iniciando sesión, yendo a “Mis Reportes” y seleccionando la opción correspondiente (TBD).',
    },
    {
      title: '¿Cómo sé si mi reporte fue resuelto?',
      summary:
        '(Aclarar que la comunidad puede ayudar al monitoreo) Recibirás una notificación cuando tu reporte haya sido resuelto, y podrás verificar el estado en la sección de “Mis Reportes”.',
    },
    {
      title: '¿Qué hago si veo un reporte falso o inapropiado?',
      summary:
        'Puedes reportar un problema con un reporte específico utilizando la opción de “Revisar Reporte” en la página del reporte (TBD)',
    },
    {
      title: '¿Cómo puedo contactar al soporte si necesito ayuda?',
      summary:
        'Puedes contactarnos a través del correo electrónico, wepa@traquealo.com.',
    },

    {
      title: '¿Cómo puedo asegurarme de que mi reporte sea atendido?',
      summary: '(AQUI TENEMOS QUE ACLARAR PARTE DE LA VISION',
    },
    {
      title: '¿Puedo compartir los reportes en redes sociales?',
      summary:
        'Sí, puedes compartir los reportes en redes sociales para aumentar la visibilidad y fomentar una rápida resolución.',
    },
  ]

  return (
    <Stack sx={{ maxWidth: '1024px', width: '100%', py: 8, px: 4 }}>
      <h1>FAQ</h1>
      <BasicAccordion questions={questions} />
      {/*
        
        
       
        X. **¿Puedo reportar un problema de forma anónima?**
           - Respuesta: Sí, ofrecemos la opción de reportar problemas de forma anónima, aunque te animamos a crear una cuenta para un mejor seguimiento.

        
   
        14. ****
            - Respuesta: 
        
        15. **¿Cómo puedo seguir a [Nombre de la Plataforma] en redes sociales?**
            - Respuesta: Puedes seguirnos en nuestras redes sociales a través de los enlaces proporcionados en nuestra página web.
        
        16. **¿Qué hago si olvidé mi contraseña?**
            - Respuesta: Puedes restablecer tu contraseña haciendo clic en “Olvidé mi contraseña” en la página de inicio de sesión y siguiendo las instrucciones.
        
        17. **¿Cómo puedo cambiar mi dirección de correo electrónico o contraseña?**
            - Respuesta: Puedes cambiar tu dirección de correo electrónico o contraseña iniciando sesión, accediendo a tu perfil y seleccionando la opción de editar.
        
        18. **¿Cómo puedo borrar mi cuenta?**
            - Respuesta: Si deseas borrar tu cuenta, por favor contacta al soporte para obtener ayuda.
        
        
        20. **¿Cómo puedo sugerir mejoras o nuevas funciones para [Nombre de la Plataforma]?**
            - Respuesta: Valoramos tus sugerencias y comentarios. Puedes enviarnos tus ideas a través de nuestro formulario de contacto o correo electrónico.
        
        
        */}
    </Stack>
  )
}
