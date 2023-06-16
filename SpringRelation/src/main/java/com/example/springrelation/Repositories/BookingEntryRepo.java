package com.example.springrelation.Repositories;

import com.example.springrelation.model.timetracking.BookingEntry;
import com.example.springrelation.model.timetracking.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingEntryRepo extends JpaRepository<BookingEntry,Long> {

}
