import zh from './zh_Tw.js';
// import navbar from './navbar.js';
import listgroup from './listgroup.js';
// import products from './products.js';
import pagination from './pagination.js';

// Vue.component('navbar', navbar);
Vue.component('listgroup', listgroup);
Vue.component('pagination', pagination);
// Vue.component('products', products);
Vue.use(VueLoading);
Vue.component('loading', VueLoading);
// 註冊全域的表單驗證元件（ValidationProvider）
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// item.price 轉換千分位及加上$符號
Vue.filter('thousands', (num) => {
	let parts =num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return 'NT$ ' + parts.join('.');
});

// Class 設定檔案
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
VeeValidate.localize('tw', zh);

new Vue({
	el: '#app',
	data: {
		uuid: '39ed65ef-c142-496e-b606-5f28634ee538',
		apipath: 'https://course-ec-api.hexschool.io',
		isLoading: false,
		products: [],
		tempProduct: {
			num: 0,
		},
		status: {
			loadingItem: '',
		},
		form: {
			name: '',
			emial: '',
			tel: '',
			address: '',
			payment: '',
			message: '',
		},
		cart: {},
		cartTotal: 0,
		pagination: {},
	},
	created() {
		this.getProducts();
		this.getCart();
	},
	methods: {
		getProducts(page = 1) {
			const vm = this;
			vm.isLoading = true;
			const url = `${this.apipath}/api/${this.uuid}/ec/products?page=${page}`;
			axios
				.get(url)
				.then((res) => {
					vm.products = res.data.data;
					vm.isLoading = false;
					vm.pagination = res.data.meta.pagination;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getInfo(id) {
			const vm = this;
			vm.status.loadingItem = id;
			const url = `${this.apipath}/api/${this.uuid}/ec/product/${id}`;
			axios
				.get(url)
				.then((res) => {
					vm.tempProduct = res.data.data;
					vm.$set(vm.tempProduct, 'num', 0);
					// console.log(vm.tempProduct);
					$('#productModal').modal('show');
					vm.status.loadingItem = '';
				});
		},
		addToCart(item, quantity = 1) {
			const vm = this;
			vm.status.loadingItem = item.id;
			const url = `${this.apipath}/api/${this.uuid}/ec/shopping`;
			const cart = {
				product: item.id,
				quantity,
			};

			axios
				.post(url, cart)
				.then(() => {
					vm.status.loadingItem = "";
					$('#productModal').modal('hide');
					vm.getCart();
					swal("太棒了！", "已加入購物車", "success");
				})
				.catch((err) => {
					vm.status.loadingItem = "";
					console.log(err);
					$('#productModal').modal('hide');
					swal({
						title: "Oh...oh",
						text: `${err.response.data.errors}`,
						type: "warning",
						closeOnConfirm: true,
					});
				});
		},
		getCart() {
			const vm = this;
			vm.isLoading = true;
			const url = `${this.apipath}/api/${this.uuid}/ec/shopping`;
			axios
				.get(url)
				.then((res) => {
					vm.cart = res.data.data;
					vm.isLoading = false;
					vm.cart.forEach(item => {
						vm.cartTotal += item.product.price;
					});
					vm.isLoading = false;
				});
		},
		count() {
			const vm = this;
			let total = 0;
			vm.cart.forEach(item => {
				console.log(item);
				total += item.product.price * item.quantity;
			});
			vm.cartTotal = total;
			$('#cartModal').modal('show');
		},
		updateQuantity(id, num) {
			const vm = this;
			const url = `${this.apipath}/api/${this.uuid}/ec/shopping`;
			if(num <= 0) return;
			vm.isLoading = true;

			const data = {
				product: id,
				quantity: num,
			};

			axios
				.patch(url, data)
				.then(() => {
					vm.isLoading = false;
					vm.getCart();
				});
		},
		removeAllCartItem() {
			const vm = this;
      vm.isLoading = true;
      const url = `${this.apipath}/api/${this.uuid}/ec/shopping/all/product`;

			axios
				.delete(url)
        .then(() => {
          vm.isLoading = false;
					vm.getCart();
					swal("", "您的商品已刪除。", "success");
        });
    },
    removeCartItem(id) {
			const vm = this;
      vm.isLoading = true;
      const url = `${this.apipath}/api/${this.uuid}/ec/shopping/${id}`;

			axios
				.delete(url)
				.then(() => {
					vm.isLoading = false;
					vm.getCart();
					swal("", "您的商品已刪除。", "success");
      });
		},
		createOrder() {
			const vm = this;
			const url = `${this.apipath}/api/${this.uuid}/ec/orders`;
			vm.isLoading = true;
			axios
				.post(url, vm.form)
				.then((res) => {
					if(res.data.data.id) {
						vm.isLoading = false;
						swal("太棒了！", "您的訂單已完成！", "success");
						$('#orderModal').modal('hide');
						vm.getCart();
						$('#cartModal').modal('hide');
					}
				})
				.catch((err) => {
					vm.isLoading = false;
					console.log(err);
				});
		},
	},
});