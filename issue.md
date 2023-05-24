- default id as cuid2
- auto updated at time
- migration on delete on update issue
- serial doesn't work on mysql
- no option for int unsigned
    <!-- try -->
  18446744073709551615
  18446744073709552000

bigint: 18,446,744,073,709,551,615 unsigned // eighteen quintillion, four hundred forty-six quadrillion, seven hundred forty-four trillion, seventy-three billion, seven hundred nine million, five hundred fifty-one thousand, six hundred fifteen.
int: The number 4,294,967,295 unsigned // four billion, two hundred ninety-four million, nine hundred sixty-seven thousand, two hundred ninety-five.

const cuid2 = customType<{ data: string; notNull: true }>({
dataType() {
return "text";
},
toDriver(value): string {
return value ? value : createId();
},
});

const User = sqliteTable(
"User",
{ id: cuid2("id").primaryKey() }
);

// adapter
async createUser(user) {
return db
.insert(User)
.values({ ...user, id: "" })
.returning()
.get();
},

---

// notNull in customType will be left false, because we always are
// generating it in toDriver
const cuid2 = customType<{ data: string; notNull: false }>({
dataType() {
return "text";
},
toDriver(value): string {
return typeof value === 'undefined' ? createId() : value;
},
});

const User = sqliteTable("User", {
id: cuid2("id"),
name: text("name").notNull(),
}, (t) => ({
// need to define primary key here, so migration will create PK constraint
// but type will be left nullable
f: primaryKey(t.id)
}));

async createUser(user) {
// id will be optional
return db.insert(User).values(...user).returning().get();
};
