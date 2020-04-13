import { Component, OnInit } from '@angular/core';
import {
  AI_STORAGE_GRID_X,
  AI_STORAGE_GRID_Y
} from 'src/app/constants/ai-user-constants';
import {
  AI_GRID_DEFAULT,
  AI_WINDOW_RESIZE_DEB_TIME,
  AI_WINDOW_PADDING
} from 'src/app/constants/ai-grid-constants';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public gridArray: number[];
  public nodeDim = '9px';
  public nodeNumber: number;
  public gridX: number;
  public gridY: number;
  constructor() {}

  ngOnInit(): void {
    this.setNodeNumber();
    this.calculNodeDim(window.innerWidth);
    this.listenToResize();
    this.gridArray = Array(this.nodeNumber);
  }

  setNodeNumber() {
    if (
      localStorage.getItem(AI_STORAGE_GRID_X) &&
      localStorage.getItem(AI_STORAGE_GRID_Y)
    ) {
      this.gridX = +localStorage.getItem(AI_STORAGE_GRID_X);
      this.gridY = +localStorage.getItem(AI_STORAGE_GRID_Y);
    } else {
      this.gridX = AI_GRID_DEFAULT;
      this.gridY = AI_GRID_DEFAULT;
    }
    this.nodeNumber = this.gridX * this.gridY;
  }

  calculNodeDim(windowSize: number) {
    const availableWidth = windowSize - AI_WINDOW_PADDING;
    this.nodeDim = this.convertToPx(availableWidth / this.gridX);
  }

  convertToPx(value: number): string {
    return value + 'px';
  }

  listenToResize() {
    const resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(AI_WINDOW_RESIZE_DEB_TIME))
      .subscribe((event: UIEvent) => {
        const win = event.target as Window;
        this.calculNodeDim(win.innerWidth);
      });
  }
}
