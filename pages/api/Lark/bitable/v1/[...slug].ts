import { withSafeKoa } from '../../../../../lib/API';
import { proxyLarkAll } from '../../../../../lib/LarkAPI';

export const config = { api: { bodyParser: false } };

export default withSafeKoa(proxyLarkAll);
