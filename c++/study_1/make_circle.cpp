
#include <windows.h>
#include <iostream>

using namespace std;


//간단한 객체의 구현과 그림 그리기

class MY_CIRCLE {
public:
	int left, right, top, bottom;

	MY_CIRCLE(int l, int t, int r, int b) : left(l), top(t), right(r), bottom(b) {

	}

	void do_draw() {
		HDC hdc = GetWindowDC(GetForegroundWindow());
		Ellipse(hdc, left, top, right, bottom);
	}

	MY_CIRCLE& CloneR() {
		return *this;
	}

	MY_CIRCLE* CloneP() {
		return this;
	}
};


void make_circle() {

	MY_CIRCLE c1(100, 100, 180, 180);
	MY_CIRCLE c2(200, 200, 300, 300);

	c1.do_draw();
	c2.do_draw();
}
