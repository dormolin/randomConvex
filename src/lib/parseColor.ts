/**
 * convert color string into {r, g, b}
 * @param color color expression. e.g. #ff00ee, #ecb, rgb(33, 0, 255)
 * @returns rgb number [0-255]
 */
export const parseColor = (color: string) => {
    if ((color[0] === '#') && (color.length > 4)) {
        return {
            r: parseInt(color.substring(1, 3), 16),
            g: parseInt(color.substring(3, 5), 16),
            b: parseInt(color.substring(5, 7), 16)
        }
    } else if ((color[0] === '#') && color.length === 4) {
        const r = color.substring(1, 2)
        const g = color.substring(2, 3)
        const b = color.substring(3, 4)
        return {
            r: parseInt(`${r}${r}`, 16),
            g: parseInt(`${g}${g}`, 16),
            b: parseInt(`${b}${b}`, 16)
        }
    } else {
        const re = /\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
        const result = re.exec(color)
        if (result) {
            return {
                r: parseInt(result[1] ?? '0', 10),
                g: parseInt(result[2] ?? '0', 10),
                b: parseInt(result[3] ?? '0', 10)
            }
        } else {
            throw 'invalid color format';
        }
    }
};

