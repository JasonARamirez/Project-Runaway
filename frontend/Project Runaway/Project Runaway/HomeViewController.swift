//
//  ViewController.swift
//  Project Runaway
//
//  Created by Josh Gonzales-Neal on 2/24/17.
//  Copyright © 2017 se329. All rights reserved.
//

import UIKit
import GoogleMaps

// MARK: -
// TODO: -
// FIXME: -

class HomeViewController: UIViewController, UISearchBarDelegate {

    @IBOutlet weak var MapView: GMSMapView!
    
    @IBOutlet weak var homeNavBar: UINavigationBar!
    
    @IBOutlet weak var sidebarMenuButton: UIBarButtonItem!
    
    @IBOutlet weak var homeSearchBar: UISearchBar!
    
    let regionRadius: CLLocationDistance = 1000
    
    var searchActive : Bool = false
    var email = ""
    var emailStringPassed = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        email = emailStringPassed
        
        showAlert()
        
        homeSearchBar.delegate = self
        homeSearchBar.placeholder = "Search"
    }
    
    @IBAction func openMenu(sender: AnyObject) {
        performSegue(withIdentifier: "openMenu", sender: nil)
    }
    
    
    
    override func loadView() {
        // Create a GMSCameraPosition that tells the map to display the
        // coordinate -33.86,151.20 at zoom level 6.
        let camera = GMSCameraPosition.camera(withLatitude: -33.86, longitude: 151.20, zoom: 6.0)
        let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
        view = mapView
        
        // Creates a marker in the center of the map.
        let marker = GMSMarker()
        marker.position = CLLocationCoordinate2D(latitude: -33.86, longitude: 151.20)
        marker.title = "Sydney"
        marker.snippet = "Australia"
        marker.map = mapView
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func showAlert() {
        
        let alertController = UIAlertController(title: "Welcome Back", message: "Start a new trip!", preferredStyle: .alert)
        
        let defaultAction = UIAlertAction(title: "OK", style: .default, handler: nil)
        alertController.addAction(defaultAction)
        
        present(alertController, animated: true, completion: nil)
        
    }
    
    func searchBarTextDidBeginEditing(_ searchBar: UISearchBar) {
        searchActive = true;
    }
    
    func searchBarTextDidEndEditing(_ searchBar: UISearchBar) {
        searchActive = false;
    }
    
    func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
        searchActive = false;
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        searchActive = false;
    }
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        
        //filtered = data.filter({ (text) -> Bool in
            //let tmp: NSString = text
            //let range = tmp.rangeOfString(searchText, options: NSStringCompareOptions.CaseInsensitiveSearch)
            //return range.location != NSNotFound
        //})
        //if(filtered.count == 0){
            //searchActive = false;
        //} else {
            //searchActive = true;
        //}
        //self.tableView.reloadData()
    }


}

