import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

   /**
    * Use all validation rules on a puzzle
    *
    * @param {string} puzzle the puzzle to validate
    * @return {boolean} true if the puzzle is valid and false otherwise
    */
   validatePuzzle(puzzle: string): boolean {

      // Validation rules
      const rules = [
         this.validateLength,
         this.validateCharacters,
         this.validateRows,
         this.validateColumns,
         this.validateUnits
      ];

      // Run all validation functions
      for (const rule of rules) {
         if (!rule(puzzle)) { return false; }
      }

      return true;

   }

   /**
    * Check if a puzzle is of valid length
    * A puzzle must be a string of 81 characters
    *
    * @param {string} puzzle the puzzle to check
    * @return {boolean} true if the puzzle is of valid length and false otherwise
    */
   validateLength(puzzle: string): boolean {
      return typeof(puzzle) === 'string' && puzzle.length === 81;
   }

   /**
    * Check that all characters in the puzzle are valid
    * All characters must be a number in range (1-9) or '.'
    *
    * @param {string} puzzle the puzzle to check
    * @return {boolean} true if the puzzle only contains valid characters and false otherwise
    */
   validateCharacters(puzzle: string): boolean {

      if (typeof(puzzle) === 'string') { // Check for empty puzzle

         for (const num of puzzle) {

            if ((isNaN(parseInt(num, 10)) && num !== '.') || parseInt(num, 10) === 0) {
               return false;
            }

         }

      } else { return false; } // Puzzle is empty

      return true;

   }

   /**
    * Check a string for duplicate values
    *
    * @param {string} list the list to check
    * @return {boolean} true if the list has duplicates and false otherwise
    */
   hasDuplicates(list: string): boolean {

      const seen = {}; // HashMap of seen values

      if (typeof(list) === 'string') {

         for (const value of list) {

            if (value !== '.') {
               if (value in seen) { return true; }
               seen[value] = true;
            }


         }

      }

      return false;

   }

   /**
    * Ensure that there are no conflicts in the puzzle rows
    * The same value can not appear twice in a single row
    *
    * @param {string} puzzle the puzzle to validate
    * @return {boolean} true if all rows are valid and false otherwise
    */
   validateRows = (puzzle: string): boolean => {

      // Build puzzle rows
      const rows = makeRows(puzzle);

      // Check rows for duplicates
      for (const row of rows) {
         if (this.hasDuplicates(row)) { return false; }
      }

      return true;

      /**
       * Helper function for getting the rows in a puzzle
       *
       * @param {string} puzzle the puzzle to parse
       * @return {string[]} an array containing each row as a string
       */
      function makeRows(p: string) {

         const r = [];

         for (let i = 0; i < p.length; i += 9) {

            const start = i;
            const end = i + 9;
            const row = p.substring(start, end);
            r.push(row);

         }

         return r;

      }

   }

   /**
    * Ensure that there are no conflicts in the puzzle columns
    * The same value can not appear twice in a single column
    *
    * @param {string} puzzle the puzzle to validate
    * @return {boolean} true if all columns are valid and false otherwise
    */
   validateColumns = (puzzle: string): boolean => {

      // Build puzzle columns
      const cols = makeCols(puzzle);

      // Check columns for duplicates
      for (const col of cols) {
         if (this.hasDuplicates(col)) { return false; }
      }

      return true;

      /**
       * Helper function for getting the columns in a puzzle
      *
      * @param {string} p the puzzle to parse
      * @return {string[]} an array containing each column as a string
      */
      function makeCols(p: string) {

         const c = [];

         for (let i = 0; i < 9; i++) {
            let col = '';

            for (let j = i; j < p.length; j += 9) {
               col += p[j];
            }

            c.push(col);
         }

         return c;

      }

   }

   /**
    * Ensure that there are no conflicts in the puzzle units
    * The same value can not appear twice in a single unit
    *
    * @param {string} puzzle the puzzle to validate
    * @return {boolean} true if all units are valid and false otherwise
    */
   validateUnits = (puzzle: string): boolean => {

      // Build puzzle units
      const units = makeUnits(puzzle);

      // Check units for duplicates
      for (const unit of units) {
         if (this.hasDuplicates(unit)) { return false; }
      }

      return true;

      /**
       * Helper function for getting the units in a puzzle
       *
       * @param {string} p the puzzle to parse
       * @return {string[]} an array containing all units for this puzzle
       */
      function makeUnits(p: string) {

         const u = [];

         for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 9; j += 3) {

               const pos = j + (i * 27);
               const firstRow = p.substring(pos, pos + 3);
               const secondRow = p.substring(pos + 9, pos + 12);
               const thirdRow = p.substring(pos + 18, pos + 21);
               const unit = firstRow + secondRow + thirdRow;
               u.push(unit);

            }
         }

         return u;

      }

   }

}
