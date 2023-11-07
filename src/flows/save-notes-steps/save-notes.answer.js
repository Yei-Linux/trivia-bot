const { cache } = require('../../config');

/**
 * Saves a note answer to the cache.
 *
 * @param {Object} ctx - The context object.
 * @param {Object} noteFieldValue - The note field value.
 * @return {undefined}
 */
const saveNoteAnswer = ({ ctx, noteFieldValue = {} }) => {
  const phone = ctx.from;

  cache().upsertStore(phone, {}, (store) => ({
    ...store,
    noteToSave: { ...(store.noteToSave ?? {}), ...noteFieldValue },
  }));
};

module.exports = { saveNoteAnswer };
