// src/utils/alertas.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const alertaInfo = (titulo, texto) =>
  MySwal.fire(titulo, texto, 'info');

export const alertaExito = (titulo, texto) =>
  MySwal.fire(titulo, texto, 'success');

export const alertaError = (titulo, texto) =>
  MySwal.fire(titulo, texto, 'error');

export const alertaAdvertencia = (titulo, texto) =>
  MySwal.fire(titulo, texto, 'warning');

export const alertaConfirmacion = async (titulo, texto, confirmBtn = 'Sí, confirmar') => {
  const resultado = await MySwal.fire({
    title: titulo,
    text: texto,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmBtn,
    cancelButtonText: 'Cancelar'
  });

  return resultado.isConfirmed;
};
