import { ValidationService } from './validation.service';

describe('ValidationService', () => {
   let Validation: ValidationService;

   beforeEach(() => { Validation = new ValidationService(); });

   describe('#validatePuzzle', () => {

      // Test data
      const easy = '.96.4..3..5782....1..9..5....9.1...85.......24...9.6....4..3..1....7926..2..5.98.';
      const intermediate = '1.8..64....6.9.8.75........2695...8....4.9....8...2791........56.4.7.2....12..9.3';
      const hard = '96..4.1.....38....7.8.6...912.8..9.3....5....3.5..2.648...9.4.7....38.....9.2..85';

      const short = '3..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
      const invalidUnit = '53..7....6..195....95....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
      const invalidChar = '53..5....5..1x5....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';

      it('should be true for a valid puzzle', () => {
         expect(Validation.validatePuzzle(easy)).toBe(true);
         expect(Validation.validatePuzzle(intermediate)).toBe(true);
         expect(Validation.validatePuzzle(hard)).toBe(true);
      });

      it('should be false for an invalid puzzle', () => {
         expect(Validation.validatePuzzle(short)).toBe(false);
         expect(Validation.validatePuzzle(invalidUnit)).toBe(false);
         expect(Validation.validatePuzzle(invalidChar)).toBe(false);
      });

      it('should be false for an empty puzzle', () => {
         expect(Validation.validatePuzzle(undefined)).toBe(false);
      });

   });

   describe('#validateLength', () => {

      // Test data
      const valid = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
      const short = '3..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
      const long = '37..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..794';

      it('should return true for puzzles with 81 characters', () => {
         expect(Validation.validateLength(valid)).toBe(true);
      });

      it('should return false for puzzles that are too short', () => {
         expect(Validation.validateLength(short)).toBe(false);
      });

      it('should return false for puzzles that are too long', () => {
         expect(Validation.validateLength(long)).toBe(false);
      });

      it('should return false for empty puzzles', () => {
         expect(Validation.validateLength(undefined)).toBe(false);
      });

   });

   describe('#validateCharacters', () => {

      // Test data
      const valid = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
      const letters = '53..7....6..1x5....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
      const zeros = '53..07....6..195....98....6.8...6...34..8.3..07...2...6.6....28....419..5....8..79';

      it('should return true for puzzles with valid characters', () => {
         expect(Validation.validateCharacters(valid)).toBe(true);
         expect(Validation.validateCharacters('123456789')).toBe(true);
         expect(Validation.validateCharacters('123456789.')).toBe(true);
         expect(Validation.validateCharacters('.')).toBe(true);
      });

      it('should return false for puzzles with letters', () => {
         expect(Validation.validateCharacters(letters)).toBe(false);
      });

      it('should return false for puzzles with zeros', () => {
         expect(Validation.validateCharacters(zeros)).toBe(false);
         expect(Validation.validateCharacters('0')).toBe(false);
         expect(Validation.validateCharacters('.0')).toBe(false);
         expect(Validation.validateCharacters('1234567890')).toBe(false);
      });

      it('should return false for empty puzzles', () => {
         expect(Validation.validateCharacters(undefined)).toBe(false);
      });

   });

   describe('#hasDuplicates', () => {

      // Test data
      const listA = '1..2.2333';
      const listB = '1.2...4.5';

      it('should be true for a list with duplicates', () => {
         expect(Validation.hasDuplicates(listA)).toBe(true);
      });

      it('should be false for a list with no duplicates', () => {
         expect(Validation.hasDuplicates(listB)).toBe(false);
      });

      it('should be false for an empty list', () => {
         expect(Validation.hasDuplicates(undefined)).toBe(false);
      });

   });

   describe('#validateRows', () => {

      // Test data
      const valid = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
      const invalid = '53..5....5..1x5....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';

      it('should be true for valid puzzles', () => {
         expect(Validation.validateRows(valid)).toBe(true);
      });

      it('should be false for invalid puzzles', () => {
         expect(Validation.validateRows(invalid)).toBe(false);
      });

   });

   describe('#validateColumns', () => {

      // Test data
      const valid = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
      const invalid = '53..5....5..1x5....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';

      it('should be true for valid puzzles', () => {
         expect(Validation.validateColumns(valid)).toBe(true);
      });

      it('should be false for invalid puzzles', () => {
         expect(Validation.validateColumns(invalid)).toBe(false);
      });

   });

   describe('#validateUnits', () => {

      // Test data
      const valid = '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......';
      const invalid = '53..7....6..195....95....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';

      it('should be true for valid units', () => {
         expect(Validation.validateUnits(valid)).toBe(true);
      });

      it('should be false for invalid units', () => {
         expect(Validation.validateUnits(invalid)).toBe(false);
      });

   });

});
