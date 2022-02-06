
#include <iostream>
#include <cctype>

using namespace std;

void cctype_lib() {
	char ch;

	while (1) {
		cin.get(ch);
		cin.get();

		if (isalnum(ch)) cout << "alpha numeric" << endl;
		if (isalpha(ch)) cout << "alphabet" << endl;
		if (isblank(ch)) cout << "blank" << endl;
		if (isdigit(ch)) cout << "digit" << endl;
		if (isxdigit(ch)) cout << "hex digit" << endl;
		if (ispunct(ch)) cout << "punctuation" << endl;
		if (islower(ch)) {
			cout << "lower, " << char(toupper(ch)) << endl;
		}
		if (isupper(ch)) {
			cout << "upper, " << char(tolower(ch)) << endl;
		}

		if (ch == '@') break;
	}
}