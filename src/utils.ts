export default class Utils {
    public static formatCurrency(value: number) {
        return `£${value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}`;
    }

    public static convertToPence(value: number) {
        return value * 100;
    }

    public static convertToPounds(value: number) {
        return value / 100;
    }
}
