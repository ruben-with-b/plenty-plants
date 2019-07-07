<template>
	<svg xmlns="http://www.w3.org/2000/svg"
	:width="width"
	:height="height"
	:aria-labelledby="iconName"
	viewBox="0 0 17 17"
	role="presentation"
	>
		<title :id="iconName" lang="en">{{iconName}} icon</title>
		<g>
			<slot/>
		</g>
	</svg>
</template>

<script>

export default {

	props: {
		iconName: {
			type: String,
			default: 'box'
		},
		width: {
			type: [Number, String],
			default: 17
		},
		height: {
			type: [Number, String],
			default: 17
		}
	}
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
