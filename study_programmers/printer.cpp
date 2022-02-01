#include <iostream>

#include <string>
#include <vector>

using namespace std;

bool checkPriorities(int w, int n, vector<int>& priorities) {
    for (int i = n; i < priorities.size(); i++) {
        if (w < priorities[i]) {
            priorities.push_back(w);
            return false;
        }
    }
    return true;
}
int solution(vector<int> priorities, int location) {
    int answer = 0;

    int cnt = 0;
    int trueCnt = 0;
    while (cnt < priorities.size()) {
        if (checkPriorities(priorities[cnt], cnt, priorities)) {
            trueCnt++;
            if (cnt == location) {
                answer = trueCnt;
                break;
            }
        }
        else {
            if (cnt == location) {
                location = (priorities.size() - 1);
            }
        }
        cnt++;
    }

    return answer;
}

void printerMain() {
    vector<int> priorities = { 2, 1, 3, 2 };
    //vector<int> priorities = { 1, 1, 9, 1, 1, 1 };

    int location = 2;

    std::cout << solution(priorities, location) << "\n";
}