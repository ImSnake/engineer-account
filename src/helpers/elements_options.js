export const inputOptions = () => {
	return {
		error: {
			classApproval: '',
			classList: 'fn fn-error',
			icon: "--elzMsk: url('/style/icons/info.svg');",
			tooltip: 'fn fn-error bgHov bgHov-error fnHov-error-t',
		},
		success: {
			classApproval: 'isValidValue',
			classList: 'isValidValue fn fn-success',
			icon: "--elzMsk: url('/style/icons/checkmark.svg')",
			tooltip: 'fn fn-success bgHov bgHov-success fnHov-success-t',
		},
		waiting: {
			classApproval: 'isValidValue',
			classList: 'isValidValue fn fn-primary-t',
			icon: "--elzMsk: url('/style/icons/clock.svg')",
			tooltip: 'fn fn-primary-t bgHov bgHov-primary-t fnHov-primary',
		}
	}
}

export const inputValidation = () => {
	return {
		email: {
			mask: 'E*',
			tokens: {
				'E': {
					pattern: /^[!#$%&'*+/=?^_`{|}~@\-.a-zA-Z0-9\s]+/
				}
			}
		},
		text: {
			mask: 'T*',
			tokens: {
				'T': {
					pattern: /^[-_,.:а-яА-ЯёЁ0-9\s]+/u
				}
			}
		},
		word: {
			mask: 'RR*',
			tokens: {
				'R': {
					pattern: /[а-яёА-ЯЁ]+/u
				}
			}
		}
	}
}

export const scoreWorksStatusOptions = (statusId) => {
	const workStatusProps = [
		{
			statusId: 1,
			buttonClass: 'bg-ok bgHovL10 fn-ok-t',
			buttonTitle: 'Начать работу',
			tagClass: 'bg-ok fn-ok-t'
		},
		{
			statusId: 2,
			buttonClass: 'bg-success bgHovL10 fn-success-t',
			buttonTitle: 'Завершить работу',
			tagClass: 'bg-success fn-success-t'
		},
		{
			statusId: 3,
			buttonClass: 'bg-primary-t fn-primary bgLInvD bgHovL-10 uDisabled',
			buttonTitle: 'Работы завершены',
			tagClass: 'bg-primary-t fn-primary'
		},
		{
			statusId: 4,
			buttonClass: 'bg-error fn-error-t bgL-5 bgLInvD bgHovL-10 uDisabled',
			buttonTitle: 'Работы отменены',
			tagClass: 'bg-error fn-error-t '
		}
	];

	return workStatusProps.find(o => o.statusId === +statusId);
}

export const tooltipOptions = (type) => {
	const options = [
		{
			type: 'success',
			classBody: 'bg-success fn-success-t',
			classTail: 'fn-success'
		},
		{
			type: 'ok',
			classBody: 'bg-ok fn-ok-t',
			classTail: 'fn-ok'
		},
		{
			type: 'error',
			classBody: 'bg-error fn-error-t',
			classTail: 'fn-error'
		},
	];

	return options.find(o => o.type === type);
}
