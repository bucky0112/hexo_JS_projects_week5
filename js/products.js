export default {
	template: `
	<div class="col-md10">
		<div class="row">
			<div class="col-md-4 col-sm-6 mb-3 mb-4"
				v-for="(item, i) in products"
				:key="item.id"
			>
				<div class="card">
					<img src="..." class="card-img-top" alt="...">
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						<a href="#" class="btn btn-primary">Go somewhere</a>
				</div>
			</div>
		</div>
		</div>
	</div>
	`,
}