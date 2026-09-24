package com.studenttaskmanager.backend.repository;

import com.studenttaskmanager.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository  extends JpaRepository<Task, Long> {
    
}
