import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private toast: ToastService) {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  addToArray(key: string, item: any) {
    const arr = this.getItem(key) || [];
    const newItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9),
      ...item,
    };
    arr.unshift(newItem);
    this.setItem(key, arr);
  }

  updateInArray(key: string, id: any, newItem: any): void {
    const arr = this.getItem(key) || [];
    const index = arr.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      arr[index] = newItem;
      this.setItem(key, arr);
    } else {
      this.toast.showErrorToast(
        'Something went wrong, Transaction could not be updated.'
      );
      console.warn(`Item with id ${newItem.id} not found in ${key}`);
    }
  }

  deleteFromArray<T>(key: string, id: any): void {
    const arr = this.getItem(key) || [];
    const index = arr.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      arr.splice(index, 1);
      this.setItem(key, arr);
    } else {
      this.toast.showErrorToast(
        'Something went wrong, Transaction could not be deleted.'
      );
    }
  }
}
