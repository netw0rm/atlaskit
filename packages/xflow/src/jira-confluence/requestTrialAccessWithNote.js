import productRequest from '../common/productRequest';

export default noteText => productRequest('confluence.ondemand')(noteText);
