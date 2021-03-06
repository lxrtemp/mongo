// Test creation of the _id index with various options:
// - _id indexes must be unique.
// - _id indexes can't be sparse.

var coll = db.index_id_options;

//
// Uniqueness.
//

// Creation of _id index with "non-zero" value for "unique" should succeed.
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandWorked(coll.ensureIndex({_id: 1}, {unique: true}));
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandWorked(coll.ensureIndex({_id: 1}, {unique: 1}));
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandWorked(coll.ensureIndex({_id: 1}, {unique: NumberLong(1)}));

// Creation of _id index with "zero" value for "unique" should fail.
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandFailed(coll.ensureIndex({_id: 1}, {unique: false}));
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandFailed(coll.ensureIndex({_id: 1}, {unique: 0}));
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandFailed(coll.ensureIndex({_id: 1}, {unique: NumberLong(0)}));

//
// Sparseness.
//

// Creation of _id index with "non-zero" value for "sparse" should fail.
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandFailed(coll.ensureIndex({_id: 1}, {sparse: true}));
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandFailed(coll.ensureIndex({_id: 1}, {sparse: 1}));
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandFailed(coll.ensureIndex({_id: 1}, {sparse: NumberLong(1)}));

// Creation of _id index with "zero" value for "unique" should succeed.
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandWorked(coll.ensureIndex({_id: 1}, {sparse: false}));
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandWorked(coll.ensureIndex({_id: 1}, {sparse: 0}));
coll.drop();
assert.commandWorked(coll.runCommand("create", {autoIndexId: false}));
assert.commandWorked(coll.ensureIndex({_id: 1}, {sparse: NumberLong(0)}));
