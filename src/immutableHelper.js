export default function Immutable(obj) {
	return {
		set: function() {
			switch (arguments.length) {
			case 1:
				return Object.assign(obj.constructor(), obj, arguments[0]);

			case 2:
				return Object.assign(obj.constructor(), obj, { [arguments[0]]: arguments[1]});

			default:
				throw new Error('No arguments provided');
			}
		}
	};
}