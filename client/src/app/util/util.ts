export default function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
    return b ? b.pop() : "";
}

export function currencyFormat(amount: number) {
    return '$' + (amount / 100).toFixed(2);
}

export function formatDate(isoDate: string) {
    const dateObject = new Date(isoDate);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return dateObject.toLocaleDateString(undefined, options as any);
}