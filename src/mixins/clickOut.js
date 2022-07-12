export default {

	methods: {
		clickOut(actionName, e) {
			if (this[actionName] === false || !e.target.closest(`.${actionName}`)) {
				this[actionName] = false;
			}
		},
	}

}
