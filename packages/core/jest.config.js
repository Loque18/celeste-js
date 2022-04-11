module.exports = {
    moduleDirectories: ['node_modules', '<rootDir>/'],
    moduleNameMapper: {
        '^@/lib/(.*)$': '<rootDir>/packages/core/lib/$1',
    },
};
