export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 *
 * Homogenous name examples
 *
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set special characters
     * Special characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    public asString(delimiter: string = this.delimiter): string {
        let result: string = "";
        for (let i = 0; i < this.components.length; i++) {
            let component: string = this.components[i];
            component = component.replace(new RegExp(this.generateRegex(ESCAPE_CHARACTER + this.delimiter), 'g'), this.delimiter);
            component = component.replace(new RegExp(this.generateRegex(ESCAPE_CHARACTER + ESCAPE_CHARACTER), 'g'), ESCAPE_CHARACTER);
            result += component;
            if (i < this.components.length - 1) {
                result += delimiter;
            }
        }
        return result;
    }

    private generateRegex(s: string): string {
        let escapedString: string = s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        return escapedString;
    }

    /**
     * Returns a machine-readable representation of Name instance using default special characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The special characters in the data string are the default characters
     */
    public asDataString(): string {
        let result: string = "";
        if(this.delimiter == DEFAULT_DELIMITER) {
            result = this.components.join(this.delimiter);
        }
        else {
            for (let i = 0; i < this.components.length; i++) {
                let component: string = this.components[i];
                component = component.replace(new RegExp(this.generateRegex(ESCAPE_CHARACTER + this.delimiter), 'g'), this.delimiter);
                component = component.replace(new RegExp(this.generateRegex(DEFAULT_DELIMITER), 'g'), ESCAPE_CHARACTER + DEFAULT_DELIMITER);
                result += component;
                if (i < this.components.length - 1) {
                    result += DEFAULT_DELIMITER;
                }
            }
        }
        return result;
    }

    /** Returns properly masked component string */
    public getComponent(i: number): string {
        return this.components[i];
    }

    /** Expects that new Name component c is properly masked */
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    /** Returns number of components in Name instance */
    public getNoComponents(): number {
        return this.components.length;
    }

    /** Expects that new Name component c is properly masked */
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked */
    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        this.components.splice(i, 1);
    }
}
