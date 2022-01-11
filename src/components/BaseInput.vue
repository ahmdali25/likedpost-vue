<template>
  <div>
		<q-input
			v-bind="$attrs"
			:model-value="modelValue"
			:type="type"
			:label="label"
			:rules="rules"
			lazy-rules
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</div>
</template>

<script>
export default {
	name: "BaseInput",
	props: {
		type: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		modelValue: {
      type: [String,Number],
      default: null,
    },
		rules: {
			type: Array,
			required: true,
		}
	},
}
</script>

<style>

</style>