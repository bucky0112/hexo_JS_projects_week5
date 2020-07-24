export default {
	template: `
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  	<a class="navbar-brand" href="#">House of Card</a>
  	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    	<span class="navbar-toggler-icon"></span>
  	</button>

  	<div class="collapse navbar-collapse" id="navbarSupportedContent">
    	<ul class="navbar-nav mr-auto">
      	<li class="nav-item active">
        	<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      	</li>
				<li class="nav-item">
        	<a class="nav-link" href="#">推薦商品</a>
      	</li>
      	<li class="nav-item dropdown">
        	<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          	More
        	</a>
        	<div class="dropdown-menu" aria-labelledby="navbarDropdown">
          	<a class="dropdown-item" href="#">公告</a>
          	<a class="dropdown-item" href="#">關於我們</a>
          	<div class="dropdown-divider"></div>
          	<a class="dropdown-item" href="#">聯絡我們</a>
        	</div>
      	</li>
    	</ul>
    <form class="form-inline my-2 my-lg-0">
			<button type="button" class="btn btn-primary" @click.prevent="count">
				<i class="fas fa-shopping-cart" aria-hidden="true">
					<span class="badge badge-pill badge-danger">{{ cart.length }}</span>
					<span class="sr-only">unread messages</span>
				</i>
			</button>
    </form>
  	</div>
	</nav>
	`,
	data() {
		return {};
	},
	methods: {
		count() {
			const vm = this;
			let total = 0;
			vm.cart.forEach(item => {
				console.log(item);
				$('#cartModal').modal('open');
			});
		}
	},
}