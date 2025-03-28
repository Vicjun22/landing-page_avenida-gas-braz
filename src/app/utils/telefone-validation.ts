export function telefoneValidation(telefone: string) {
    telefone = telefone.replace(/\D/g, '');
  
    if (telefone.length !== 11) {
      return false;
    }
  
    const primeiroDigito = parseInt(telefone.charAt(2));
    if (primeiroDigito < 6 || primeiroDigito > 9) {
      return false;
    }
  
    return true;
  }
  