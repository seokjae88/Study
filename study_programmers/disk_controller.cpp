#include <iostream>

#include <string>
#include <vector>
#include <queue>

using namespace std;

#define HEAP_SIZE 500

typedef struct workInfo_ {
	int startTime;
	int workTime;
	int duration;
	int pos;
} workInfo, *pWorkInfo;

class Heap {
private:
	pWorkInfo heap[HEAP_SIZE];
	int heap_count = 0;
	int mEndTime = 0;
	int pos = 0;
public:
	void swap(pWorkInfo *a, pWorkInfo *b) {
		pWorkInfo tmp = *a;
		*a = *b;
		*b = tmp;
	}

	int size() {
		return heap_count;
	}

	void init(int startTime, int workTime) {
		pWorkInfo data = new workInfo();
		data->startTime = startTime;
		data->workTime = workTime;
		mEndTime = startTime + workTime;
		data->duration = startTime + workTime;
		data->pos = pos;
		pos++;
		heap[0] = data;
	}

	void push(int startTime, int workTime) {
		pWorkInfo data = new workInfo();
		data->startTime = startTime;
		data->workTime = workTime;
		if (mEndTime < startTime) {
			pos++;
			if (heap_count > pos) {
				mEndTime = heap[pos]->startTime + heap[pos]->workTime;
				data->duration = (mEndTime - startTime) + workTime;
			}
			else {
				mEndTime = startTime + workTime;
				data->duration = workTime;
			}
			
			data->pos = pos;
		}
		else {
			data->duration = (mEndTime - startTime) + workTime;
			data->pos = pos;
		}
				
		heap[++heap_count] = data;

		int child = heap_count;
		int parent = child / 2;
		while (child > 1 
			&& (heap[parent]->pos == heap[child]->pos)
			&& (heap[parent]->duration > heap[child]->duration)) {
			swap(&heap[parent], &heap[child]);
			child = parent;
			parent = child / 2;
		}
	}

	pWorkInfo pop() {
		pWorkInfo result = heap[heap_count];
		heap[heap_count] = nullptr;
		heap_count--;
		return result;
	}

	int getTotalDuration() {
		int duration = 0;
		int endTime = 0;
		int count = 0;
		for (int i = 0; i <= heap_count; i++) {
			pWorkInfo wInfo = heap[i];
			if (endTime <= wInfo->startTime) {
				duration = duration + wInfo->workTime;
				cout << wInfo->startTime << " / " << wInfo->workTime << " / " << duration << endl;
			}
			else {
				duration = duration + ((endTime - wInfo->startTime) + wInfo->workTime);
				cout << wInfo->startTime << " / " << wInfo->workTime << " / " << duration << endl;
			}
			endTime = endTime + wInfo->workTime;
			count++;

			delete wInfo;
			heap[i] = nullptr;
		}

		return (duration / count);
	}
};

//9ms(= (3 + 7 + 17) / 3
int solution(vector<vector<int>> jobs) {
	int answer = 0;

	Heap h;
	h.init(jobs[0][0], jobs[0][1]);

	for (int i = 1; i < jobs.size(); i++) {
		h.push(jobs[i][0], jobs[i][1]);
	}

	answer = h.getTotalDuration();
	return answer;
}

void disk_controller() {
	//vector<vector<int>> jobs = { {0, 3}, {1, 9}, {2, 6} };
	vector<vector<int>> jobs = { {0, 3}, {11, 4}, {20, 4}, {26, 9}, {28, 8}, {30, 4}, {32, 5} };

	cout << solution(jobs) << endl;
}