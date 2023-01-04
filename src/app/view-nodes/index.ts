import { registerButton } from './button';
import {} from './container/index';
import { registerDialog } from './dialog/index';
import { registrForm } from './form/base-form';
import { registerInput } from './input';
import { registerContainer } from './layout/container';
import { registerRadio } from './radio';
import { registerText } from './text';
export * from './node/base';
export { registerComponent };

function registerComponent() {
  registerButton(window);
  registerDialog(window);
  registrForm(window);
  registerInput(window);
  registerContainer(window);
  registerRadio(window);
  registerText(window);
}
