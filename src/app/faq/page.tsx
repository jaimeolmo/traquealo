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
    {
      title: '¿Cómo puedo seguir a Traquealo en redes sociales?',
      summary:
        'Puedes seguirnos en nuestras redes sociales a través de los enlaces proporcionados en nuestra página web.',
    },
    {
      title: '¿Cómo puedo borrar mi cuenta?',
      summary:
        'Si deseas borrar tu cuenta, por favor contacta al soporte para obtener ayuda.',
    },
    {
      title: '¿Cómo puedo sugerir mejoras o nuevas funciones para Traquealo?',
      summary:
        'Valoramos tus sugerencias y comentarios. Puedes enviarnos tus ideas a través de nuestro formulario de contacto o correo electrónico.',
    },
    {
      title: '',
      summary: '',
    },
    {
      title: '',
      summary: '',
    },
    {
      title: '',
      summary: '',
    },
    {
      title: '',
      summary: '',
    },
    {
      title: '',
      summary: '',
    },
  ]

  return (
    <Stack sx={{ maxWidth: '1024px', width: '100%', py: 8, px: 4 }}>
      <h1>FAQ</h1>
      <BasicAccordion questions={questions} />
    </Stack>
  )
}
