export class PackageError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PackageError';
    }
}
